// backend/src/index.ts
import app from "./app";

const PORT = Number(process.env.PORT) || 3000;

throw new Error('fallo simulado');

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});