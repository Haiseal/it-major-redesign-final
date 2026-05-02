import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import advisorRoutes from "./routes/advisorRoutes.js";
import departmentAdminRoutes from "./routes/departmentAdminRoutes.js";
import systemAdminRoutes from "./routes/systemAdminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/advisor", advisorRoutes);
app.use("/api/department-admin", departmentAdminRoutes);
app.use("/api/system-admin", systemAdminRoutes);

export default app;
