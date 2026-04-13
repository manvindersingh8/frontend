import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BackButton = ({ label = "Back", className = "" }) => {
  const navigate = useNavigate();

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={() => navigate(-1)}
      className={`text-[#4A6CF7] bg-white hover:bg-gray-100 ${className}`}
    >
      ← {label}
    </Button>
  );
};

export default BackButton;
