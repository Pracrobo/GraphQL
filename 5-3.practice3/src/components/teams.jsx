import "./components.css";
import { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
const GET_TEAMS = gql`
  query GetTeams {
    teams {
      id
      manager
      members {
        id
        first_name
        last_name
        role
      }
    }
  }
`;
const GET_TEAM = gql`
  query GetTeam($id: ID!) {
    team(id: $id) {
      id
      manager
      office
      extension_number
      mascot
      cleaning_duty
      project
    }
  }
`;

const DELETE_TEAM = gql`
  mutation DeleteTeam($id: ID!) {
    deleteTeam(id: $id) {
      id
    }
  }
`;

const EDIT_TEAM = gql`
  mutation EditTeam($id: ID!, $input: PostTeamInput!) {
    editTeam(id: $id, input: $input) {
      id
      manager
      office
      extension_number
      mascot
      cleaning_duty
      project
    }
  }
`;

const POST_TEAM = gql`
  mutation PostTeam($input: PostTeamInput!) {
    postTeam(input: $input) {
      id
      manager
      office
      extension_number
      mascot
      cleaning_duty
      project
    }
  }
`;

function AsideItems({ setContentId, setRefetchTeams }) {
  const { loading, error, data, refetch } = useQuery(GET_TEAMS);
  useEffect(() => {
    if (setRefetchTeams) {
      setRefetchTeams(() => refetch); // 중요: 함수 형태로 넘기기
    }
  }, [refetch]);

  const roleIcons = {
    developer: "💻",
    designer: "🎨",
    planner: "📝",
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error :(</p>;

  return (
    <ul>
      {data.teams.map(({ id, manager, members }) => {
        return (
          <li key={id}>
            <span
              className="teamItemTitle"
              onClick={() => {
                setContentId(id);
              }}
            >
              Team {id} : {manager}'s
            </span>
            <ul className="teamMembers">
              {members.map(({ id, first_name, last_name, role }) => {
                return (
                  <li key={id}>
                    {roleIcons[role]} {first_name} {last_name}
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

function MainContents({
  inputs,
  setInputs,
  contentId,
  setContentId,
  refetchTeams,
}) {
  const [deleteTeam] = useMutation(DELETE_TEAM, {
    onCompleted: deleteTeamCompleted,
  });

  function execDeleteTeam() {
    if (window.confirm("이 항목을 삭제하시겠습니까?")) {
      deleteTeam({ variables: { id: contentId } });
    }
  }

  function deleteTeamCompleted(data) {
    console.log(data.deleteTeam);
    alert(`${data.deleteTeam.id} 항목이 삭제되었습니다.`);
    refetchTeams();
    setContentId(0);
  }

  const [editTeam] = useMutation(EDIT_TEAM, { onCompleted: editTeamCompleted });

  function execEditTeam() {
    editTeam({
      variables: {
        id: contentId,
        input: inputs,
      },
    });
  }
  function editTeamCompleted(data) {
    console.log(data.editTeam);
    alert(`${data.editTeam.id} 항목이 수정되었습니다.`);
    refetchTeams();
  }

  const [postTeam] = useMutation(POST_TEAM, { onCompleted: postTeamCompleted });

  function execPostTeam() {
    postTeam({
      variables: { input: inputs },
    });
  }

  function postTeamCompleted(data) {
    console.log(data.postTeam);
    alert(`${data.postTeam.id} 항목이 생성되었습니다.`);
    refetchTeams();
    setContentId(0);
  }

  const { loading, error } = useQuery(GET_TEAM, {
    variables: { id: contentId },
    onCompleted: (data) => {
      if (contentId === 0) {
        setInputs({
          manager: "",
          office: "",
          extension_number: "",
          mascot: "",
          cleaning_duty: "",
          project: "",
        });
      } else {
        setInputs({
          manager: data.team.manager,
          office: data.team.office,
          extension_number: data.team.extension_number,
          mascot: data.team.mascot,
          cleaning_duty: data.team.cleaning_duty,
          project: data.team.project,
        });
      }
    },
  });

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error :(</p>;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  return (
    <div className="inputContainer">
      <table>
        <tbody>
          {contentId !== 0 && (
            <tr>
              <td>Id</td>
              <td>{contentId}</td>
            </tr>
          )}
          <tr>
            <td>Manager</td>
            <td>
              <input
                type="text"
                name="manager"
                value={inputs.manager}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Office</td>
            <td>
              <input
                type="text"
                name="office"
                value={inputs.office}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Extension Number</td>
            <td>
              <input
                type="text"
                name="extension_number"
                value={inputs.extension_number}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Mascot</td>
            <td>
              <input
                type="text"
                name="mascot"
                value={inputs.mascot}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Cleaning Duty</td>
            <td>
              <input
                type="text"
                name="cleaning_duty"
                value={inputs.cleaning_duty}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Project</td>
            <td>
              <input
                type="text"
                name="project"
                value={inputs.project}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {contentId === 0 ? (
        <div className="buttons">
          <button onClick={execPostTeam}>Submit</button>
        </div>
      ) : (
        <div className="buttons">
          <button onClick={execEditTeam}>Modify</button>
          <button onClick={execDeleteTeam}>Delete</button>
          <button
            onClick={() => {
              setContentId(0);
            }}
          >
            New
          </button>
        </div>
      )}
    </div>
  );
}

function Teams() {
  const [contentId, setContentId] = useState(0);
  const [refetchTeams, setRefetchTeams] = useState(() => () => {});
  const [inputs, setInputs] = useState({
    manager: "",
    office: "",
    extension_number: "",
    mascot: "",
    cleaning_duty: "",
    project: "",
  });

  return (
    <div id="teams" className="component">
      <aside>
        <AsideItems
          setContentId={setContentId}
          setRefetchTeams={setRefetchTeams}
        />
      </aside>
      <section className="contents">
        <MainContents
          contentId={contentId}
          setContentId={setContentId}
          inputs={inputs}
          setInputs={setInputs}
          refetchTeams={refetchTeams}
        />
      </section>
    </div>
  );
}

export default Teams;
