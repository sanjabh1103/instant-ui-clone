
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RenameDialog({
  open,
  onOpenChange,
  onRename,
  initialValue
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onRename: (newValue: string) => void;
  initialValue: string;
}) {
  const [value, setValue] = useState(initialValue);

  // Reset value each time dialog is opened
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
        </DialogHeader>
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          className="mt-2"
          autoFocus
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onRename(value.trim());
              onOpenChange(false);
            }}
            disabled={!value.trim()}
          >
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
