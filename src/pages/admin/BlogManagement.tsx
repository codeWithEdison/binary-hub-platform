import { useState } from "react";
import { Edit, FileText, MoreHorizontal, Plus, Search, Star, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { AdminPage, AdminPageHeader, AdminPanel, AdminToolbar } from "@/components/admin/AdminPage";

const BlogManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { posts, loading, deletePost } = useBlogPosts(true);
  const filteredPosts = posts.filter((post) =>
    `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) await deletePost(id);
  };

  return (
    <AdminPage>
      <AdminPageHeader
        title="Blog management"
        description="Create, publish, and choose the main public blog story."
        actions={
          <Button asChild className="h-10 rounded-[7px]">
            <Link to="/admin/blog/new" className="flex items-center gap-2"><Plus className="h-4 w-4" /> New Blog Post</Link>
          </Button>
        }
      />

      <AdminToolbar>
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search blog posts..." className="h-10 rounded-[7px] pl-9" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
        </div>
      </AdminToolbar>

      <AdminPanel>
          <Table>
            <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Category</TableHead><TableHead>Status</TableHead><TableHead>Main</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {loading ? Array.from({ length: 4 }).map((_, index) => <TableRow key={index}><TableCell><Skeleton className="h-5 w-64" /></TableCell><TableCell><Skeleton className="h-5 w-24" /></TableCell><TableCell><Skeleton className="h-5 w-20" /></TableCell><TableCell><Skeleton className="h-5 w-16" /></TableCell><TableCell><Skeleton className="ml-auto h-8 w-8" /></TableCell></TableRow>) : filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell><div className="max-w-md"><div className="font-medium">{post.title}</div><div className="line-clamp-1 text-sm text-muted-foreground">{post.excerpt}</div></div></TableCell>
                  <TableCell><Badge variant="outline">{post.category}</Badge></TableCell>
                  <TableCell><Badge variant={post.published ? "default" : "secondary"}>{post.published ? "Published" : "Draft"}</Badge></TableCell>
                  <TableCell>{post.is_main ? <Badge className="gap-1 bg-amber-500"><Star className="h-3 w-3" /> Main</Badge> : <span className="text-sm text-muted-foreground">No</span>}</TableCell>
                  <TableCell className="text-right"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem asChild><Link to={`/admin/blog/edit/${post.id}`} className="flex items-center gap-2"><Edit className="h-4 w-4" /> Edit</Link></DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem className="text-destructive" onClick={() => handleDelete(post.id)}><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell>
                </TableRow>
              ))}
              {!loading && filteredPosts.length === 0 && <TableRow><TableCell colSpan={5} className="py-12 text-center text-muted-foreground">No blog posts found.</TableCell></TableRow>}
            </TableBody>
          </Table>
      </AdminPanel>
    </AdminPage>
  );
};

export default BlogManagement;
