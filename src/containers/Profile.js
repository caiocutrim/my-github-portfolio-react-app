import React, { useState, useEffect } from "react";
import Link from "../components/Link/Link";
import List from "../components/List/List";
import styled from "styled-components";

const ProfileWrapper = styled.div`
  width: 50%;
  margin: 10px auto;
`;
const Avatar = styled.img`
  width: 150px;
`;
const getGithubDataUser = (state, setState) => () => {
  try {
    const fetchData = async () => {
      const profile = await fetch("https://api.github.com/users/caiocutrim"); // eslint-disable-line
      const profileJSON = await profile.json();
      if (profileJSON) {
        const repositories = await fetch(profileJSON.repos_url); // eslint-disable-line
        const repositoriesJSON = await repositories.json();
        setState({
          ...state,
          data: profileJSON,
          repositories: repositoriesJSON,
          loading: false,
        });
      }
    };
    fetchData();
  } catch (error) {
    setState({
      ...state,
      loading: false,
      error: error.message,
    });
  }
};

const Profile = () => {
  const [state, setState] = useState({
    data: {},
    loading: true,
    repositories: [],
    error: "",
  });
  useEffect(getGithubDataUser(state, setState));
  const { data, loading, repositories, error } = state;

  if (loading || error) {
    return <div>{loading ? "Loading..." : error}</div>;
  }

  const descriptionList = [
    {
      label: "html_url",
      value: <Link url={data.html_url} title="Github url" />,
    },
    { label: "repos_url", value: data.repos_url },
    { label: "name", value: data.name },
    { label: "company", value: data.company },
    { label: "location", value: data.location },
    { label: "email", value: data.email },
    { label: "bio", value: data.bio },
  ];

  const projects = repositories.map((repository) => ({
    label: repository.name,
    value: <Link url={repository.html_url} title="Github URL" />,
  });

  return (
    <ProfileWrapper className="Profile-container">
      <Avatar className="Profile-avatar" src={data.avatar_url} alt="Avatar" />
      <List title="Profile" items={descriptionList} />
      <List title="Projects" items={projects} />
    </ProfileWrapper>
  );
};

export default Profile;
