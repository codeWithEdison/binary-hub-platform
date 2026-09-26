import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStakeholders } from "@/hooks/useStakeholders";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StakeholderForm } from "./StakeholderForm";
import { AdminPage, AdminPageHeader, AdminPanel } from "@/components/admin/AdminPage";
import { CenteredLoadingOrb } from "@/components/LoadingOrb";

export const StakeholderManagement = () => {
  const { stakeholders, loading, deleteStakeholder } = useStakeholders();
  const [selectedStakeholder, setSelectedStakeholder] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (id: string) => {
    setSelectedStakeholder(id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this stakeholder?")) {
      await deleteStakeholder(id);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedStakeholder(null);
  };

  if (loading) {
    return (
      <AdminPage>
        <CenteredLoadingOrb state="searching" label="Loading stakeholders" minHeightClassName="min-h-[40vh]" />
      </AdminPage>
    );
  }

  return (
    <AdminPage>
      <AdminPageHeader
        title="Stakeholder management"
        description="Manage partners and stakeholder logos shown on the site."
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="h-10 rounded-[7px]"
                onClick={() => setSelectedStakeholder(null)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Stakeholder
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedStakeholder ? "Edit Stakeholder" : "Add New Stakeholder"}
                </DialogTitle>
              </DialogHeader>
              <StakeholderForm
                stakeholderId={selectedStakeholder}
                onSuccess={handleDialogClose}
                onCancel={handleDialogClose}
              />
            </DialogContent>
          </Dialog>
        }
      />

      <AdminPanel>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Contribution</TableHead>
              <TableHead>Website</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stakeholders.map((stakeholder) => (
              <TableRow key={stakeholder.id}>
                <TableCell>
                  {stakeholder.logo ? (
                    <img
                      src={stakeholder.logo}
                      alt={stakeholder.name}
                      className="h-10 w-10 object-contain"
                    />
                  ) : null}
                </TableCell>
                <TableCell className="font-medium">{stakeholder.name}</TableCell>
                <TableCell>{stakeholder.category}</TableCell>
                <TableCell className="max-w-xs truncate">{stakeholder.contribution}</TableCell>
                <TableCell>
                  {stakeholder.website ? (
                    <a
                      href={stakeholder.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00628b] hover:underline"
                    >
                      Visit
                    </a>
                  ) : null}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 rounded-[7px]"
                      onClick={() => handleEdit(stakeholder.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 rounded-[7px]"
                      onClick={() => handleDelete(stakeholder.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AdminPanel>
    </AdminPage>
  );
};
