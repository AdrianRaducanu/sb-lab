import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import Reviews from "./components/Reviews";
import Books from "./components/Books";
import Users from "./components/Users";
import { BiSearchAlt, BiCaretDown } from "react-icons/bi";
import { IoLibrary } from "react-icons/io5";
import { VscOpenPreview } from "react-icons/vsc";
import { v4 as uuidv4 } from "uuid";
import "./style/style.scss";

function App() {
  const [librarie, setLibrarie] = useState(false);
  const [carti, setCarti] = useState([]);
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [usersView, setUsersView] = useState(false);
  const [librarieReview, setLibrarieReview] = useState(false);
  const [apiReview, setApiReview] = useState([]);
  const [cartiCitite, setCartiCitite] = useState([]);
  const [profile, setProfile] = useState({});
  const [isOn, setIsOn] = useState(false);
  const [idulProfilului, setIdulProfilului] = useState(0);

  //functii

  //----------------------------------
  const funcText = (e) => {
    setText(e.target.value);
  };

  //----------------------------------
  const funcSearch = () => {
    if (text !== "") {
      const options = {
        method: "GET",
        url: "https://609c507904bffa001792cd3d.mockapi.io/user",
      };
      axios
        .request(options)
        .then(function (response) {
          //console.log(response.data);
          setUsers(
            response.data.filter((u) => {
              return (
                u.givenName.toLowerCase().includes(text.toLowerCase()) ||
                u.familyName.toLowerCase().includes(text.toLowerCase())
              );
            })
          );
        })
        .catch(function (error) {
          console.error(error);
        });
      setUsersView(!usersView);
      setText("");
    } else {
      alert("type something..");
    }
  };

  //----------------------------------
  //configurare

  const response = (response) => {
    var exista = false;
    console.log(response.profileObj);
    setProfile(response.profileObj);

    //rezolvarea duplicitatii
    const opt = {
      method: "GET",
      url: "https://609c507904bffa001792cd3d.mockapi.io/user",
    };
    axios.request(opt).then(function (r) {
      const dupl = r.data.filter(
        (userExistenti) =>
          userExistenti.googleId === response.profileObj.googleId
      );
      //alert(dupl[0].books)

      if (dupl.length !== 0) {
        exista = true;
        setCartiCitite(dupl[0].books);
      }
      if (exista === false) {
        //adaugare user
        axios
          .post("https://609c507904bffa001792cd3d.mockapi.io/user", {
            googleId: response.profileObj.googleId,
            givenName: response.profileObj.givenName,
            familyName: response.profileObj.familyName,
            imageUrl: response.profileObj.imageUrl,
          })
          .then(
            (res) => {
              //obtin id-ul din mockApi
              const options = {
                method: "GET",
                url: "https://609c507904bffa001792cd3d.mockapi.io/user",
              };
              axios
                .request(options)
                .then(function (respons) {
                  const userId = respons.data.filter(
                    (x) => x.googleId === response.profileObj.googleId
                  );

                  //console.log(userId[0].id);
                  setIdulProfilului(userId[0].id);
                })
                .catch(function (error) {
                  console.error(error);
                });
            },
            (error) => {
              console.log(error);
            }
          );
      } else {
        const options = {
          method: "GET",
          url: "https://609c507904bffa001792cd3d.mockapi.io/user",
        };
        axios
          .request(options)
          .then(function (rsp) {
            const userId = rsp.data.filter(
              (x) => x.googleId === response.profileObj.googleId
            );
            //alert(userId[0].id)
            //console.log(userId[0].id);
            setIdulProfilului(userId[0].id);
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    });

    setIsOn(!isOn);
  };
  //----------------------------------
  const responseNegativ = (response) => {
    console.log(response);
    alert("Something went wrong..try again!");
  };

  //----------------------------------
  const responseOut = (r) => {
    setLibrarie(false);
    setLibrarieReview(false);
    setUsersView(false);
    setCartiCitite([]);
    setApiReview([]);
    alert("R U SURE?");
    setIsOn(!isOn);
    console.log("idul prof = " + idulProfilului);
    axios
      .delete(
        "https://609c507904bffa001792cd3d.mockapi.io/user/" + idulProfilului
      )
      .then((res) => {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  //----------------------------------
  //api data
  const options = {
    method: "GET",
    url: "https://6099a1040f5a130017219804.mockapi.io/books/",
  };

  const funcCarti = () => {
    axios
      .request(options)
      .then(function (response) {
        setCarti(funcAddId(response.data));
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  /**
   * Functia adauga ID unic fiecarei carti
   * @param {array} carti
   * @returns carti cu id unice
   */
  // (asa se com o functie :D)
  const funcAddId = (carti) => {
    return carti.map((carte) => {
      return { ...carte, id: uuidv4() };
    });
  };
  //----------------------------------
  //activez libraria cu carti

  const funcCartiFull = () => {
    funcCarti();
    setLibrarie(!librarie);
  };

  //----------------------------------
  //activez libraria cu reviewuri

  const funcAfisReview = () => {
    setLibrarieReview(!librarieReview);
    const optionsRev = {
      method: "GET",
      url: "https://609c507904bffa001792cd3d.mockapi.io/user/" + idulProfilului,
    };
    axios
      .request(optionsRev)
      .then(function (responseRev) {
        console.log(">>>>>>>>>>>>>>", responseRev.data.books);
        setApiReview(responseRev.data.books);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  //post in api

  if (isOn) {
    return (
      <div className="app">
        <Reviews
          librarieReview={librarieReview}
          setLibrarieReview={setLibrarieReview}
          apiReview={apiReview}
        />
        <Books
          setCarti={setCarti}
          carti={carti}
          librarie={librarie}
          setLibrarie={setLibrarie}
          cartiCitite={cartiCitite}
          setCartiCitite={setCartiCitite}
          idulProfilului={idulProfilului}
        />
        <Users
          users={users}
          usersView={usersView}
          setUsersView={setUsersView}
        />
        <div className="main-page">
          <div class="books-icon">
            <IoLibrary
              onClick={() => funcCartiFull()}
              style={{
                color: "#677081",
                fontSize: "3.5rem",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          </div>

          <form>
            <input
              placeholder="Start stalkin' "
              value={text}
              onChange={funcText}
            ></input>
            <BiSearchAlt
              onClick={() => funcSearch()}
              style={{
                color: "#677081",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            />
          </form>
          <div className="user-info">
            <img
              src={profile.imageUrl}
              onClick={() => {
                console.log(cartiCitite);
              }}
            ></img>
            <GoogleLogout
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  I'm out
                </button>
              )}
              clientId="905167112657-2iohqfh6o6p0cq9orqs9r31qp10qdaad.apps.googleusercontent.com"
              buttonText="I'm out"
              onLogoutSuccess={responseOut}
            />
            <h1 onClick={() => console.log(profile)}>
              {profile.givenName + " " + profile.familyName}
            </h1>
            <h2>Reviews:{apiReview.length}</h2>
            <BiCaretDown
              style={{
                color: "#677081",
                animation: "MoveUpDown 1.2s linear infinite",
              }}
            />
            <VscOpenPreview
              onClick={() => funcAfisReview()}
              style={{
                color: "grey",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="page-login">
        <div className="text-login">
          <h1>CASUAL REVIEWS</h1>
          <GoogleLogin
            buttonText="Look Around"
            clientId="905167112657-2iohqfh6o6p0cq9orqs9r31qp10qdaad.apps.googleusercontent.com"
            onSuccess={response}
            isSignedIn={true}
            onFailure={responseNegativ}
          />
        </div>
      </div>
    );
  }
}

export default App;
