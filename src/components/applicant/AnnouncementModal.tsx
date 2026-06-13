import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Bell } from "lucide-react";
import { IAnnouncement } from "@/interfaces/announcement.interface";

interface AnnouncementModalProps {
  open: boolean;
  announcement: IAnnouncement | null;
  onClose: () => void;
}

const AnnouncementModal: React.FC<AnnouncementModalProps> = ({
  open,
  announcement,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {open && announcement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Bell size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  {announcement.title}
                </p>
                <p className="text-xs text-slate-400">
                  {announcement.type} Announcement
                </p>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {announcement.body?.slice(0, 300)}
              {announcement.body?.length > 300 ? "..." : ""}
            </p>
            <button
              onClick={onClose}
              className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-3 rounded-xl text-sm transition-colors"
            >
              Got it
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementModal;
