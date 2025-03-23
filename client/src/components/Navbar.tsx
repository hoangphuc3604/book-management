
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Book, Users } from "lucide-react";

export function Navbar() {
  return (
    <header className="bg-background border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl">Quản lý Sách</Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/books" className="flex items-center gap-2 text-sm font-medium">
              <Book className="h-4 w-4" />
              Sách
            </Link>
            <Link to="/authors" className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4" />
              Tác giả
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/books/new">Thêm sách</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/authors/new">Thêm tác giả</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
