import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import axios from "axios";
import { Questions, QuestionsResponse } from "../components/Questions";

interface IsLoggedInResponse {
  id: number;
  username: string;
  logged: boolean;
}
interface Props {
  id: number;
  username: string;
  logged: boolean;
  questions: QuestionsResponse[];
}

const Home: NextPage<Props> = ({ questions }) => {
  return (
    <>
      <Head>
        <title>Все вопросы</title>
      </Head>
      <div className="container d-flex">
        <Questions questions={questions} />
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get("http://fasfafsa.fun:5000/api/question");
  const questions = await res.data;

  if (ctx.req.headers.cookie) {
    try {
      const res = await axios.get<IsLoggedInResponse>(
        "http://fasfafsa.fun:5000/api/auth",
        {
          withCredentials: true,
          headers: { cookie: ctx.req.headers.cookie },
        }
      );
      const data = await res.data;

      const { id, username, logged } = data;
      return {
        props: {
          id,
          username,
          logged,
          questions,
        },
      };
    } catch (e) {
      return {
        props: {
          id: null,
          username: null,
          logged: false,
          questions,
        },
      };
    }
  }

  return {
    props: {
      id: null,
      username: null,
      logged: false,
      questions,
    },
  };
};
