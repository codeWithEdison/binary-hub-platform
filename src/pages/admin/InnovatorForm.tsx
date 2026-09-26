import { useParams, useNavigate } from "react-router-dom";
import InnovatorForm from "@/components/InnovatorForm";
import { AdminPage } from "@/components/admin/AdminPage";

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
    <AdminPage>
      <InnovatorForm
        innovatorId={id}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </AdminPage>
  );
};

export default AdminInnovatorForm;
