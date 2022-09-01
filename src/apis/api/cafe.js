import axios from "axios";

var config = {
    headers: { 'Content-Type': 'application/json' }
  };

const getCafes = async () => {
    await axios.get("/admin/cafes", config)
        .then((response) => {
            return response.data['data'];
        })
        .catch((error) => {
            console.error("ERROR: " + error);
        });
}
