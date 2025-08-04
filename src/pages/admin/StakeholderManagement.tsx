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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Stakeholder Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedStakeholder(null)}>
              <Plus className="h-4 w-4 mr-2" />
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
      </div>

      <div className="rounded-md border">
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
                  {stakeholder.logo && (
                    <img
                      src={stakeholder.logo}
                      alt={stakeholder.name}
                      className="h-10 w-10 object-contain"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{stakeholder.name}</TableCell>
                <TableCell>{stakeholder.category}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {stakeholder.contribution}
                </TableCell>
                <TableCell>
                  {stakeholder.website && (
                    <a
                      href={stakeholder.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visit
                    </a>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(stakeholder.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
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
      </div>
    </div>
  );
};