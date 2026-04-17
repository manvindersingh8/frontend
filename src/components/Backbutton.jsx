import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackButton = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="default"
      size="icon"
      onClick={() => navigate(-1)}
      className={`rounded-full ${className}`}
    >
      <ArrowLeftIcon />
    </Button>
  );
};

export default BackButton;
