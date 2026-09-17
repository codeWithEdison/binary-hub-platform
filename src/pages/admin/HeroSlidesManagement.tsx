import { Edit, Image as ImageIcon, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useHeroSlides } from "@/hooks/useHeroSlides";

const HeroSlidesManagement = () => {
  const { slides, loading, deleteSlide } = useHeroSlides(true);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this hero slide?")) await deleteSlide(id);
  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="mb-1 text-2xl font-semibold">Hero Slides</h1>
            <p className="text-muted-foreground">Manage the images and text shown in the homepage hero slider.</p>
          </div>
          <Button asChild><Link to="/admin/hero-slides/new" className="flex items-center gap-2"><Plus className="h-4 w-4" /> New Hero Slide</Link></Button>
        </div>

        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader><TableRow><TableHead>Preview</TableHead><TableHead>Title</TableHead><TableHead>Order</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {loading ? Array.from({ length: 4 }).map((_, index) => <TableRow key={index}><TableCell><Skeleton className="h-14 w-24" /></TableCell><TableCell><Skeleton className="h-5 w-56" /></TableCell><TableCell><Skeleton className="h-5 w-10" /></TableCell><TableCell><Skeleton className="h-5 w-20" /></TableCell><TableCell><Skeleton className="ml-auto h-8 w-8" /></TableCell></TableRow>) : slides.map((slide) => (
                <TableRow key={slide.id}>
                  <TableCell><img src={slide.image_url} alt="" className="h-14 w-24 rounded object-cover" /></TableCell>
                  <TableCell><div className="max-w-md"><div className="font-medium">{slide.title}</div><div className="line-clamp-1 text-sm text-muted-foreground">{slide.description}</div></div></TableCell>
                  <TableCell>{slide.sort_order}</TableCell>
                  <TableCell><Badge variant={slide.published ? "default" : "secondary"}>{slide.published ? "Published" : "Draft"}</Badge></TableCell>
                  <TableCell className="text-right"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem asChild><Link to={`/admin/hero-slides/edit/${slide.id}`} className="flex items-center gap-2"><Edit className="h-4 w-4" /> Edit</Link></DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem className="text-destructive" onClick={() => handleDelete(slide.id)}><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell>
                </TableRow>
              ))}
              {!loading && slides.length === 0 && <TableRow><TableCell colSpan={5} className="py-12 text-center text-muted-foreground"><ImageIcon className="mx-auto mb-3 h-8 w-8" />No hero slides yet.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default HeroSlidesManagement;
