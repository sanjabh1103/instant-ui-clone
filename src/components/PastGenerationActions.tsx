
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/ui/dialog";
import RenameDialog from "@/components/ui/rename-dialog";

export default function PastGenerationActions({
  onDelete,
  onRename,
  initialName,
}: {
  onDelete: () => void;
  onRename: (newName: string) => void;
  initialName: string;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);

  return (
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="w-8 h-8"><MoreVertical /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setRenameOpen(true)} className="flex items-center gap-2">
            <Pencil className="w-4 h-4" /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setConfirmOpen(true)} className="flex items-center gap-2 text-red-600">
            <Trash className="w-4 h-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Rename Dialog */}
      <RenameDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        onRename={onRename}
        initialValue={initialName}
      />
      {/* Delete confirmation */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <div className={`fixed inset-0 z-50 grid items-center justify-center`}>
          <div className="bg-white border rounded-lg p-6 text-center shadow-lg max-w-xs mx-auto">
            <div className="mb-3 text-xl font-semibold text-red-600 flex justify-center"><Trash className="w-6 h-6 mr-2" /> Delete?</div>
            <div className="text-gray-700 mb-6">Are you sure you want to delete this project?</div>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={() => { onDelete(); setConfirmOpen(false); }}>Delete</Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
