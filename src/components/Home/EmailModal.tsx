import React, { useState } from 'react';
import { Copy, Mail, X } from 'lucide-react';

interface EmailModalProps {
  email: string;
  phone: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EmailModal({ email, phone, isOpen, onClose }: EmailModalProps) {
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleCopyPhone = async () => {
    await navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleMailTo = () => {
    window.location.href = `mailto:${email}`;
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
        w-[90%] max-w-md bg-gray-900 rounded-lg shadow-xl p-6">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-white mb-4">Me Contacter</h2>
        
        <div className="bg-white/5 rounded-lg p-3 mb-6 break-all">
          <p className="text-white/90 text-center">{email}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md
              bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? 'Copié !' : 'Copier'}</span>
          </button>
          
          <button
            onClick={handleMailTo}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md
              bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Ouvrir mails</span>
          </button>

        </div>

        <div className="mt-5">
          <div className="bg-white/5 rounded-lg p-3 mb-6 break-all">
            <p className="text-white/90 text-center">{phone}</p>
          </div>
  
          <div className="flex gap-4">
            <button
              onClick={handleCopyPhone}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md
                bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedPhone ? 'Copié !' : 'Copier'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}