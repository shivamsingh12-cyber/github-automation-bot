import axios from "axios";
import { useEffect, useState } from "react";
import "./repo.css";

const Repository = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const [reposRes, connectedRes] = await Promise.all([
        axios.get("http://localhost:5000/repositories", {
        withCredentials: true,
      }),
       axios.get("http://localhost:5000/repositories/connected", {
        withCredentials: true,
      }),
      ]) ;

      const connectedIds = new Set(connectedRes.data.map((r)=>r.repoId))

      setUser(
        reposRes.data.map(repo=>({
          ...repo,
          connected:connectedIds.has(repo.id),
        }))
      );
    };

    fetchUser();
  }, []);

  const onSubmit = (repo)=>{
    const repository={
      repoId:repo.id,
      repoName:repo.name,
      fullName:repo.fullName,
      owner:repo.owner,
      private:repo.private
    }
        axios.post("http://localhost:5000/repositories/connect",repository, {
        withCredentials: true
    }).
        then(()=>{
          setUser(prev=>
            prev.map(r=>
              r.id===repository.repoId
              ? {...r, connected:true}
              :r
            )
          )
        }).
        catch((err)=>console.log("we caught error ",err));
  }

  return (
    <div className="repo-page">
      <h1 className="repo-title">Repositories</h1>

      <div className="repo-list">
        {users.map((repo) => (
          <div className="repo-card" key={repo.id}>
            <h2>{repo.name}</h2>
            <p>{repo.description || "No description available"}</p>

            <div className="repo-meta">
              <span>Owner: {repo.owner || "Unknown"}</span>
              <span>{repo.private ? "Private" : "Public"}</span>
            </div>

            <button className="connect-btn" type="button" onClick={()=>onSubmit(repo)}
              disabled={repo.connected}
              >
              {repo.connected? "✓ Connected":"Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Repository;
