import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { 
  CheckCircle, 
  XCircle, 
  Home, 
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultStatusCardProps {
  status: "success" | "error" ;
  title?: string;
  description?: string;
  message?: string;
  error?: string;
  onRetry?: () => void;
  onContinue?: () => void;
  onGoHome?: () => void;
  loading?: boolean;
}

function ResultStatusCard({ 
  status,
  title,
  description,
  message,
  error,
  onRetry,
  onContinue,
  onGoHome,
  loading = false
}: ResultStatusCardProps) {
  
  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          icon: CheckCircle,
          iconColor: "text-green-500",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          title: title || "Success!",
          description: description || "Operation completed successfully",
          message: message || "Your new place has been created successfully!"
        };
      case "error":
        return {
          icon: XCircle,
          iconColor: "text-red-500",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          title: title || "Error",
          description: description || "Something went wrong",
          message: error || "An error occurred during the operation"
        };
      default:
        return {
          icon: CheckCircle,
          iconColor: "text-green-500",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          title: "Success!",
          description: "Operation completed successfully",
          message: "Your new place has been created successfully!"
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <Card className={cn(
      "w-full md:w-1/2 mx-4 transition-all duration-300",
      config.borderColor
    )}>
      <CardHeader className="text-center pb-4">
        <div className={cn(
          "mx-auto mb-4 p-3 rounded-full w-fit",
          config.bgColor
        )}>
          <IconComponent className={cn("h-8 w-8", config.iconColor)} />
        </div>
        
        <CardTitle className="font-bold text-2xl text-foreground">
          {config.title}
        </CardTitle>
        
        <CardDescription className="text-muted-foreground">
          {config.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="text-center">
        <div className={cn(
          "p-4 rounded-lg mb-4",
          config.bgColor
        )}>
          <p className={cn(
            "text-sm font-medium",
            status === "success" ? "text-green-800" :
            status === "error" ? "text-rose-800" :
            "text-yellow-800"
          )}>
            {config.message}
          </p>
        </div>

        {status === "success" && (
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✓ Property details saved</p>
            <p>✓ Location information stored</p>
            <p>✓ Photos uploaded successfully</p>
            <p>✓ Listing is now ready for guests</p>
          </div>
        )}

        {status === "error" && (
          <div className="text-sm text-muted-foreground">
            <p>Please check your information and try again.</p>
            <p>If the problem persists, contact support.</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6">
        {status === "error" && onRetry && (
          <Button 
            variant="outline" 
            onClick={onRetry}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            {loading ? "Retrying..." : "Try Again"}
          </Button>
        )}

        {status === "success" && onContinue && (
          <Button 
            onClick={onContinue}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}

        {onGoHome && (
          <Button 
            variant={status === "success" ? "outline" : "default"}
            onClick={onGoHome}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go to Dashboard
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ResultStatusCard;