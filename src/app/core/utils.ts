import { HttpHeaders } from "@angular/common/http";

export const url = "https://market-connect.onrender.com";
export const token = localStorage.getItem("token");
export const headers = new HttpHeaders().set(
  "Authorization",
  `Bearer ${token}`
);
