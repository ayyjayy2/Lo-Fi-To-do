import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface KawaiiDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  listName: string;
}

export const KawaiiDeleteDialog = ({ 
  open, 
  onOpenChange, 
  onConfirm, 
  listName 
}: KawaiiDeleteDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-3xl bg-gradient-to-br from-secondary via-background to-accent border-2 border-primary/30 shadow-2xl max-w-md font-quicksand">
        <AlertDialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            {/* Kawaii cat icon */}
            <div className="w-16 h-12 bg-white rounded-3xl relative border-2 border-gray-200/50 shadow-lg">
              {/* Ears */}
              <div className="absolute -top-2 left-3 w-3 h-4 bg-white rounded-full border border-gray-200/50" />
              <div className="absolute -top-2 right-3 w-3 h-4 bg-white rounded-full border border-gray-200/50" />
              <div className="absolute -top-1 left-4 w-1.5 h-2 bg-pink-300 rounded-full" />
              <div className="absolute -top-1 right-4 w-1.5 h-2 bg-pink-300 rounded-full" />
              {/* Sad eyes */}
              <div className="absolute top-3 left-3 w-3 h-2 bg-black rounded-full transform rotate-12" />
              <div className="absolute top-3 right-3 w-3 h-2 bg-black rounded-full transform -rotate-12" />
              {/* Worried expression */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1.5 h-1 bg-pink-400 rounded-full" />
              <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-pink-300 rounded-full transform rotate-180" />
              {/* Sweat drop */}
              <div className="absolute top-1 right-2 w-1 h-2 bg-blue-300 rounded-full" />
            </div>
          </div>
          <AlertDialogTitle className="text-xl font-semibold text-foreground">
            Delete "{listName}"? 🥺
          </AlertDialogTitle>
          <AlertDialogDescription className="text-foreground/80 leading-relaxed">
            Are you sure you want to delete this list? This action cannot be undone 
            and all tasks will be lost forever.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-3 pt-4">
          <AlertDialogCancel className="rounded-full bg-muted hover:bg-muted/80 text-foreground border-0 px-6 py-2 transition-all duration-200 hover:scale-105 font-medium">
            Keep List
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="rounded-full bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary text-foreground border-0 px-6 py-2 transition-all duration-200 hover:scale-105 font-medium shadow-lg"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};