
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Plus, Eye } from "lucide-react";
import { useBlogStore } from "@/stores/blogStore";
import { useToast } from "@/hooks/use-toast";

const AdminBlogs = () => {
  const { fetchAdminPosts, createPost, updatePost, deletePost, getPublishedPosts } = useBlogStore();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image: "📝",
    author: "Admin User",
    published: false
  });

  useEffect(() => {
    fetchAdminPosts();
  }, []);
  
  const posts = getPublishedPosts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPost) {
      updatePost(editingPost.id, formData);
      toast({
        title: "Post updated!",
        description: "The blog post has been updated successfully.",
      });
    } else {
      createPost(formData);
      toast({
        title: "Post created!",
        description: "The blog post has been created successfully.",
      });
    }
    
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      image: "📝",
      author: "Admin User",
      published: false
    });
    setIsEditing(false);
    setEditingPost(null);
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      image: post.image,
      author: post.author,
      published: post.published
    });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deletePost(id);
      toast({
        title: "Post deleted!",
        description: "The blog post has been deleted successfully.",
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingPost(null);
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      image: "📝",
      author: "Admin User",
      published: false
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-amber-900">Blog Management</h2>
          <p className="text-amber-700">Create and manage blog posts</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="bg-amber-600 hover:bg-amber-700">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        )}
      </div>

      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>{editingPost ? "Edit Post" : "Create New Post"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image Emoji</label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="📝"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Excerpt</label>
                <Input
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief description of the post..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg min-h-[200px]"
                  placeholder="Write your blog post content here..."
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="published" className="text-sm font-medium">Publish immediately</label>
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                  {editingPost ? "Update Post" : "Create Post"}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-xl">
                      <img src={post.image} className="w-8 h-8 rounded" />
                    </span>
                    <h3 className="text-lg font-semibold text-amber-900">{post.title}</h3>
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-amber-700 mb-2">{post.excerpt}</p>
                  <p className="text-sm text-gray-500">
                    By {post.author} • {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {posts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">No blog posts yet</h3>
              <p className="text-amber-700 mb-4">Create your first blog post to get started</p>
              <Button onClick={() => setIsEditing(true)} className="bg-amber-600 hover:bg-amber-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;
