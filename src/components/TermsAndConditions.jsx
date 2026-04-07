import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-6 text-sm text-gray-700 space-y-4">
      <h1 className="text-2xl font-bold">Terms of Service</h1>

      <p>
        Welcome to our platform. By accessing or using this application, you
        agree to the following terms:
      </p>

      <div>
        <h2 className="font-semibold">1. Use of the Platform</h2>
        <p>
          You agree to use this platform only for lawful purposes. You must not
          misuse the service or attempt to access data that does not belong to
          you.
        </p>
      </div>

      <div>
        <h2 className="font-semibold">2. User Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials. Any activity under your account is your
          responsibility.
        </p>
      </div>

      <div>
        <h2 className="font-semibold">3. Job Listings & Applications</h2>
        <p>
          We do not guarantee the accuracy of job listings. Users should verify
          details independently before applying.
        </p>
      </div>

      <div>
        <h2 className="font-semibold">4. Prohibited Activities</h2>
        <ul className="list-disc ml-5">
          <li>Post false or misleading information</li>
          <li>Upload harmful or malicious content</li>
          <li>Violate any applicable laws</li>
        </ul>
      </div>

      <div>
        <h2 className="font-semibold">5. Termination</h2>
        <p>
          We reserve the right to suspend or terminate accounts that violate
          these terms.
        </p>
      </div>

      <div>
        <h2 className="font-semibold">6. Changes to Terms</h2>
        <p>
          We may update these terms at any time. Continued use of the platform
          means you accept the updated terms.
        </p>
      </div>

      <div>
        <h2 className="font-semibold">7. Contact</h2>
        <p>support@example.com</p>
      </div>

      <div className="flex justify-center mt-6">
        <Button variant="default" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
