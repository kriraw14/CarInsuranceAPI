import app from "./app";

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}...`);
}).on("error", (err) => {
  console.error(err);
  process.exit(1);
});
