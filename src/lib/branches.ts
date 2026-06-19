import hyderabadImg from "@/assets/hyderabad.jpg";
import vijayawadaImg from "@/assets/vijayawada.jpg";
import kakinadaImg from "@/assets/kakinada.jpg";
import srikakulamImg from "@/assets/srikakulam.jpg";

export interface Branch {
  city: string;
  role: string;
  image: string;
  phone: string;
}

// Single source of truth for the four service centers used across the site.
export const BRANCHES: Branch[] = [
  { city: "Peddapuram", role: "Head Office & Service Center", image: kakinadaImg, phone: "+91 95428 40444" },
  { city: "Hyderabad", role: "Sales & Service Branch", image: hyderabadImg, phone: "+91 86881 51526" },
  { city: "Vijayawada", role: "Sales & Service Branch", image: vijayawadaImg, phone: "+91 866 247 8901" },
  { city: "Srikakulam", role: "Service Support", image: srikakulamImg, phone: "+91 894 245 6789" },
];
