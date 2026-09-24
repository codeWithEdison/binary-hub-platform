
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import InnovatorForm from "@/components/InnovatorForm";

const AdminInnovatorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/admin/members");
  };

  const handleCancel = () => {
    navigate("/admin/members");
  };

  return (
    <InnovatorForm
      innovatorId={id}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default AdminInnovatorForm;
