import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import parse from "html-react-parser";

function App() {
  const [state, setState] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await axios.get(
        `https://techcrunch.com/wp-json/wp/v2/posts?per_page=20&context=embed`
      );

      setState(data.data);
      setLoading(false);
    })();
  }, []);

  console.log(state);
  return (
    <div>
      <h2 className="heading">New Articles</h2>
      <div className="App">
        {loading && <span class="loader"></span>}
        {!loading &&
          (state?.length > 0 ? (
            state?.map((blog) => (
              <a className="link" href={blog.canonical_url} target="_blank">
                <div class="card">
                  <div className="flex flex-direction justify-content-start align-items-center">
                    <div>
                      <img
                        src={blog.jetpack_featured_media_url}
                        className="image"
                        alt="img"
                      />
                    </div>
                    <div className="flex flex-direction-column justify-content-start">
                      <div class="text">
                        <h2>{parse(blog.title.rendered)}</h2>
                      </div>
                      <div className="text">
                        <p>{parse(blog.excerpt.rendered)}</p>
                        <br />
                        <p>{new Date(blog.date).toDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <p>No Articles found</p>
          ))}
      </div>
    </div>
  );
}

export default App;
