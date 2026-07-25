import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {

  const user = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const [decks, setDecks] = useState([]);



  useEffect(() => {

    const fetchDecks = async () => {

      try {

        const { data } = await axios.get(
          "http://localhost:5000/api/decks"
        );


        setDecks(data.decks);


      } catch (error) {

        console.error(
          "Failed to fetch decks:",
          error
        );

      }

    };


    fetchDecks();


  }, []);





  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc"
      }}
    >


      <Sidebar />



      <main
        style={{
          flex: 1,
          padding: "40px"
        }}
      >


        {/* Header */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "35px"
          }}
        >


          <div>

            <h1
              style={{
                fontSize: "32px",
                marginBottom: "10px"
              }}
            >
              Welcome Back 👋 {user?.name}
            </h1>


            <p
              style={{
                color: "#64748b",
                fontSize: "17px"
              }}
            >
              Continue your learning journey with FlashMind AI.
            </p>


          </div>



          <SearchBar />


        </div>





        {/* Actions */}


        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "40px"
          }}
        >

          <Link to="/create-deck">

            <button
              style={{
                padding: "14px 25px",
                borderRadius: "10px",
                border: "none",
                background: "#2563eb",
                color: "white",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              + Create Deck
            </button>

          </Link>



          <Link to="/ai-generator">

            <button
              style={{
                padding: "14px 25px",
                borderRadius: "10px",
                border: "none",
                background: "#16a34a",
                color: "white",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              🤖 AI Generator
            </button>

          </Link>


        </div>






        <h2>
          Your Decks
        </h2>





        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(280px,1fr))",
            gap: "25px",
            marginTop: "25px"
          }}
        >



          {decks.length > 0 ? (


            decks.map((deck) => (


              <div
                key={deck._id}
                style={{
                  background: "white",
                  padding: "25px",
                  borderRadius: "15px",
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.08)"
                }}
              >


                <h3>
                  {deck.title}
                </h3>



                <p
                  style={{
                    color:"#64748b",
                    minHeight:"45px"
                  }}
                >
                  {deck.description ||
                  "No description available"}
                </p>



                <p>
                  📚 Flashcards available
                </p>



                <Link
                  to={`/deck/${deck._id}`}
                >

                  <button
                    style={{
                      marginTop:"15px",
                      padding:"10px 18px",
                      borderRadius:"8px",
                      border:"none",
                      background:"#0f172a",
                      color:"white",
                      cursor:"pointer"
                    }}
                  >
                    Open Deck
                  </button>


                </Link>


              </div>


            ))


          ) : (


            <p>
              No decks available. Create your first deck!
            </p>


          )}


        </div>



      </main>


    </div>

  );

};


export default Dashboard;