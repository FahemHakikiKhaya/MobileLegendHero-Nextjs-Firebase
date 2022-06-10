import { Box, Button, Modal } from "@mui/material";
import { database } from "../../config/firebase";
import { updateDoc, doc } from "firebase/firestore";

export default function DeleteModal({ show, onClose, hero }) {
  const handleDelete = async () => {
    const docRef = doc(database, "Hero", hero.heroId);
    await updateDoc(docRef, {
      isDelete: true,
    });
    onClose();
    alert("Data Successfuly Deleted Please Refresh The Page");
  };
  return (
    <Modal
      open={show}
      onClose={() => {
        onClose();
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            marginTop: "300px",
            width: "300px",
            height: "100px",
            backgroundColor: "white",
            padding: "50px",
            textAlign: "center",
          }}
        >
          <h3>Continue to delete hero : {hero.name}</h3>
          <Box>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleDelete()}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
