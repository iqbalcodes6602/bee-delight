
import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBlogStore } from "@/stores/blogStore";

const BlogPost = () => {
  const { id } = useParams();
  const getPost = useBlogStore((state) => state.getPost);
  const post = getPost(id || "");

  if (!post) {
    return (
      <div className="min-h-screen bg-amber-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-amber-900 mb-4">Blog Post Not Found</h1>
          <Link to="/blog">
            <Button className="bg-amber-600 hover:bg-amber-700">Back to Blog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center text-amber-600 hover:text-amber-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="p-12 text-center bg-gradient-to-br from-amber-50 to-yellow-50">
              <div className="text-8xl mb-6">{post.image}</div>
              <h1 className="text-4xl font-bold text-amber-900 mb-4">{post.title}</h1>
              
              <div className="flex items-center justify-center space-x-6 text-amber-700">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-amber-700 font-medium mb-6">{post.excerpt}</p>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 text-center">
            <Link to="/blog">
              <Button className="bg-amber-600 hover:bg-amber-700">
                Read More Articles
              </Button>
            </Link>
          </div>
        </article>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
