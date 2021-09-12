import React, { useState } from "react";
import { axiosJWT } from "../utils/axios/axios";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { formats, modules } from "../react-quill";
export const AskComponent: React.FC = () => {
  // const [isFetching, setIsFetching] = useState(false); TODO сделать загрузку когда идет запрос на сервер
  const [question, setQuestion] = useState("");
  const [tags, setTags] = useState<string>("");
  const [code, setCode] = useState<string | undefined>();
  const postQuestion = async () => {
    await axiosJWT.post(
      "http://134.0.116.16:5000/api/question/post",
      { question, tags, description: code },
      { withCredentials: true }
    );
  };
  return (
    <div className="container">
      <div className="container login-form">
        <h4>Задать вопрос</h4>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Суть вопроса
            </label>
            <input
              type="text"
              name="question"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Теги вопроса
            </label>
            <input
              type="text"
              name="tags"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <ReactQuill
              placeholder="Напиши что нибудь"
              onChange={(e) => setCode(e)}
              theme="snow"
              modules={modules}
              formats={formats}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => postQuestion()}
          >
            Опубликовать
          </button>
        </form>
      </div>
    </div>
  );
};
