"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteEvent } from "@/lib/actions/event.action";
import { useToast } from "@/components/ui/use-toast"; 

export const DeleteConfirmation = ({ eventId }: { eventId: string }) => {
  const pathname = usePathname();
  const { toast } = useToast(); // Hook to show toast notifications
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    try {
      await deleteEvent({ eventId, path: pathname });
      toast({ title: "Event deleted", description: "The event has been successfully deleted." });
    } catch (error) {
      toast({ title: "Error deleting event", description: "There was a problem deleting the event.", variant: "destructive" });
    }
  };

  const handleDeleteTransition = () => {
    startTransition(() => {
      handleDelete();
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 className="transition duration-50 hover:scale-110" />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white dark:bg-black">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this event.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-lime-600 hover:bg-neongreen text-black"
            onClick={handleDeleteTransition} // Call the synchronous function
            disabled={isPending} // Disable the button while pending
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
