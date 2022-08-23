import axios from "axios";

var config = {
    headers: { 'Content-Type': 'application/json' }
  };

const getCafes = async () => {
    await axios.get("/cafes", config)
        .then((response) => {
            return response.data['content'];
        })
        .catch((error) => {
            console.error("ERROR: " + error);
        });
}
