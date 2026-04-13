import { useEffect, useState } from "react";
import { fetchMyApplications } from "@/services/api/applicationApi.js";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APPLICATION_STATUS } from "@/constants/constants";

const MyApplications = () => {
  const [myApplications, setMyApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const result = await fetchMyApplications();
        setMyApplications(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplications();
  }, []);

  // ✅ Status → UI mapping
  const getStatusVariant = (status) => {
    switch (status) {
      case APPLICATION_STATUS.HIRED:
        return "default"; // success
      case APPLICATION_STATUS.REJECTED:
        return "destructive"; // red
      case APPLICATION_STATUS.SHORTLISTED:
        return "outline";
      case APPLICATION_STATUS.REVIEWING:
        return "secondary";
      case APPLICATION_STATUS.APPLIED:
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold">My Applications</h1>

      {/* Empty State */}
      {myApplications.length === 0 ? (
        <p className="text-center text-muted-foreground mt-6">
          No jobs applied yet
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {myApplications.map((app) => (
            <Card
              key={app._id}
              className="w-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="capitalize">{app.jobId?.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {app.jobId?.company}
                </p>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Location + Salary */}
                <div className="flex justify-between text-sm">
                  <span>📍 {app.jobId?.location}</span>
                  <span>₹{app.jobId?.salary}k</span>
                </div>

                {/* Status Badge */}
                <Badge variant={getStatusVariant(app.status)}>
                  {app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
