"use client";

import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string | File;
  onChange: (file: File | null) => void;
  previewUrl?: string; // For initial preview (edit mode)
}

const ImageUpload = ({ value, onChange, previewUrl }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(previewUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onChange(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {preview ? (
        <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-200 group">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-64 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all bg-gray-50"
        >
          <div className="p-4 bg-white rounded-full shadow-sm mb-4">
            <Upload className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">Click to upload image</p>
          <p className="text-gray-400 text-sm mt-1">SVG, PNG, JPG (max. 5MB)</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
