import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { IBlog, IParams, RootStore } from "../../utils/TypeScript";

import { deleteBlog } from "../../redux/actions/blogAction";

interface IProps {
  blog: IBlog;
}

const CardHoriz: React.FC<IProps> = ({ blog }) => {
  const { slug } = useParams<IParams>();
  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (!auth.user || !auth.access_token) return;

    if (slug !== auth.user._id)
      return dispatch({
        type: "ALERT",
        payload: { errors: "Invalid Authentication." },
      });

    if (window.confirm("Do you want to delete this post?")) {
      dispatch(deleteBlog(blog, auth.access_token));
    }
  };


  return (
    <div className="card mb-3" style={{ minWidth: "260px" }}>
      <div className="row g-0 p-2">
        <div
          className="col-md-4"
          style={{
            minHeight: "150px",
            maxHeight: "170px",
            overflow: "hidden",
          }}
        >
          {blog.imagepost && (
            <>
              {typeof blog.imagepost === "string" ? (
                <Link to={`/blog/${blog._id}`}>
                  <img
                    src={blog.imagepost}
                    className="w-100 h-100"
                    alt="thumbnail"
                    style={{ objectFit: "cover" }}
                  />
                </Link>
              ) : (
                <img
                  src={URL.createObjectURL(blog.imagepost)}
                  className="w-100 h-100"
                  alt="thumbnail"
                  style={{ objectFit: "cover" }}
                />
              )}
            </>
          )}
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <div className="text-capitalize text-decoration-none">
                {blog.title}
              </div>
            </h5>

            {blog.title && (
              <div
                className="card-text d-flex justify-content-between
                align-items-center"
              >
                {auth.user && slug === auth.user._id && (
                  <div style={{ cursor: "pointer" }}>
                    <Link to={`/update_blog/${blog._id}`}>
                      <i className="fas fa-edit" title="edit" />
                    </Link>

                    <i
                      className="fas fa-trash text-danger mx-3"
                      title="edit"
                      onClick={handleDelete}
                    />
                  </div>
                )}
                <small className="text-muted">
                  {new Date(blog.createdAt).toLocaleString()}
                </small>
              </div>
            )}
            {blog.tags.map((tag) => (
             
                <div className="border d-inline-block p-2 me-2">
                  <span>{tag.name}</span>
                </div>
             
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHoriz;
