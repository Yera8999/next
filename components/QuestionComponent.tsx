import Link from "next/link";
import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
import DOMPurify from "isomorphic-dompurify";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { QuestionProps } from "../pages/q/[id]";
import AuthContext from "../context/createContext";
import hljs from "highlight.js";
import { axiosJWT } from "../utils/axios/axios";
import { useRouter } from "next/router";
import { formats, modules } from "../react-quill";
hljs.configure({
  languages: ["javascript", "ruby", "python", "rust"],
});

export const QuestionComponent: React.FC<QuestionProps> = ({ question }) => {
  const { is_login, userData } = useContext(AuthContext);
  const [answer, setAnswer] = useState<string | undefined>();
  const router = useRouter();
  const path = router.query.id;
  const postAnswer = () => {
    axiosJWT
      .post(
        `http://fasfafsa.fun:5000/api/question/answer/${question.id}`,
        { answer },
        { withCredentials: true }
      )
      .then(() => {
        router.replace("/q/" + path);
      });
  };
  const likeAnswerHandler = (id: string) => {
    axiosJWT
      .put(
        `http://fasfafsa.fun:5000/api/question/like-answer/${question.id}`,
        { answerId: id },
        { withCredentials: true }
      )
      .then(() => {
        router.replace("/q/" + path);
      });
  };
  const deleteAnswer = (id: string) => {
    axiosJWT
      .put(
        `http://fasfafsa.fun:5000/api/question/delete-answer/${question.id}`,
        { answerId: id },
        { withCredentials: true }
      )
      .then(() => {
        router.replace("/q/" + path);
      });
  };
  return (
    <div className="sing">
      <div className="container question">
        <div className="question-wrapper">
          <div className="username-wrapper">
            <p className="username">
              {
                <Link href={`/user/${question.username}`}>
                  {"@" + question.username}
                </Link>
              }
            </p>
          </div>
          <div className="tags">
            <p className="tag">{question.tags}</p>
          </div>
          <div className="question-wrapper">
            <h1 className="question">{question.question}</h1>
            <div className="question-desc">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(question.description),
                }}
                className="code"
              ></div>
            </div>
          </div>
          <div className="views">
            <p className="view-count">{question.views} ????????????????????</p>
          </div>
          <div className="your-answer-wrapper">
            <p className="your-answer">?????? ?????????? ???? ????????????</p>
          </div>
          {question.answers.map((item) => {
            return (
              <div className="answers" key={item.id}>
                <div className="answer-username-wrapper">
                  <p className="answer-username">@{item.username}</p>
                </div>
                <div className="answer-wrapper">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item.answers),
                    }}
                  />
                </div>
                <button
                  className="btn"
                  disabled={!is_login}
                  onClick={() => likeAnswerHandler(item.id)}
                >
                  ???????????????? | {item.likes}
                </button>
                {item.username === userData.username && (
                  <button
                    className="btn red"
                    onClick={() => deleteAnswer(item.id)}
                  >
                    ??????????????
                  </button>
                )}
              </div>
            );
          })}
          {is_login ? (
            <div className="answer-group">
              <h5>???????? ?????????? ???? ????????????...</h5>
              <ReactQuill
                placeholder="??????????..."
                onChange={(e) => setAnswer(e)}
                theme="snow"
                modules={modules}
                formats={formats}
              />
              <br />
              <button className="btn" onClick={() => postAnswer()}>
                ????????????????????????
              </button>
            </div>
          ) : (
            <Link href="/sign-in">?????????? ?????????? ???????????????? ???? ????????????</Link>
          )}
        </div>
      </div>
    </div>
  );
};
