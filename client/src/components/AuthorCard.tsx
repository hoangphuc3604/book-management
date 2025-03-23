
import { Author } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Card className="h-full author-card transition-all duration-300 hover:shadow-card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-primary">
          <User className="h-5 w-5" />
          {author.name}
        </CardTitle>
        <CardDescription>Tuổi: {author.age}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-muted-foreground">
          <BookOpen className="h-4 w-4 text-secondary" />
          <span>Số sách: </span>
          <Badge variant="secondary" className="ml-1">
            {author.books?.length || 0}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full btn-primary-effect">
          <Link to={`/authors/${author.id}`}>Xem chi tiết</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
