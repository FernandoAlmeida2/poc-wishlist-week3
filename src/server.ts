import app, { init } from "./app";

const PORT = +process.env.PORT || 4000;

init().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`);
  });
});
