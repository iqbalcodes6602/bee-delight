
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBlogStore } from "@/stores/blogStore";

const Blog = () => {
  const posts = useBlogStore((state) => state.getPublishedPosts());

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Our Blog</h1>
          <p className="text-amber-700 text-lg max-w-2xl mx-auto">
            Discover the world of honey, beekeeping, and natural health through our latest articles and insights.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6 text-center bg-gradient-to-br from-amber-50 to-yellow-50">
                  <div className="text-6xl mb-4">{post.image}</div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold text-amber-900 mb-3 hover:text-amber-700">
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-amber-700 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Link to={`/blog/${post.id}`}>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700">
                      Read More
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-amber-900 mb-2">No blog posts yet</h3>
            <p className="text-amber-700">Check back soon for our latest articles!</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
