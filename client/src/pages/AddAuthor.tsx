
import { Navbar } from "@/components/Navbar";
import { AuthorForm } from "@/components/AuthorForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AddAuthor = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container py-8">
        <div className="mb-6">
          <Button asChild variant="outline" size="sm" className="mb-6 btn-primary-effect">
            <Link to="/authors" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại danh sách
            </Link>
          </Button>
        </div>
        
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-primary">Thêm Tác giả Mới</h1>
          <div className="p-6 rounded-lg border bg-gradient-1 shadow-card">
            <AuthorForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAuthor;
