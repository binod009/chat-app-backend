import express from "express"
import cors from "cors";
const PORT =3000
const app = express();


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})