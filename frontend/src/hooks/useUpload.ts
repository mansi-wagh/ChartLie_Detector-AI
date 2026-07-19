import { useState, useRef } from "react";
import { uploadChart } from "../services/api";
import type { AnalysisResult } from "../types";

export type UploadStage = 
  | "Idle"
  | "Uploading Image..."
  | "Analyzing Chart Layout..."
  | "Running Rule Engine..."
  | "Generating AI Report..."
  | "Preparing PDF..."
  | "Complete";

export default function useUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<UploadStage>("Idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const timerRef = useRef<number | null>(null);

  const selectFile = (selectedFile: File) => {
    // Validate image format
    if (!["image/png", "image/jpeg", "image/jpg"].includes(selectedFile.type)) {
      setError("Unsupported format. Please select PNG, JPG, or JPEG.");
      return;
    }
    setFile(selectedFile);
    setError(null);
    setResult(null);
    setProgress(0);
    setStage("Idle");
  };

  const removeFile = () => {
    setFile(null);
    setResult(null);
    setProgress(0);
    setStage("Idle");
    setError(null);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const startAnalysis = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setProgress(10);
    setStage("Uploading Image...");

    // Set up a simulated progress builder for stages post-upload
    let currentProgress = 10;
    
    const incrementProgress = (target: number, nextStage: UploadStage, delay: number) => {
      return new Promise<void>((resolve) => {
        setStage(nextStage);
        const step = () => {
          if (currentProgress < target) {
            currentProgress += 1;
            setProgress(currentProgress);
            timerRef.current = window.setTimeout(step, delay);
          } else {
            resolve();
          }
        };
        step();
      });
    };

    try {
      // Start upload call
      const uploadPromise = uploadChart(file);

      // Rapidly progress through upload simulation
      await incrementProgress(25, "Uploading Image...", 25);
      
      // Stage: Analyzing Chart Layout
      const analysisPromise = incrementProgress(50, "Analyzing Chart Layout...", 80);
      
      // Run the upload request simultaneously
      const [response] = await Promise.all([uploadPromise, analysisPromise]);

      // Stage: Running Rule Engine
      await incrementProgress(70, "Running Rule Engine...", 40);

      // Stage: Generating AI Report
      await incrementProgress(85, "Generating AI Report...", 50);

      // Stage: Preparing PDF
      await incrementProgress(98, "Preparing PDF...", 60);

      // Success
      setProgress(100);
      setStage("Complete");
      setResult(response);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.detail || 
        err.message || 
        "Failed to upload or analyze the chart. Please try again."
      );
      setStage("Idle");
      setProgress(0);
    } finally {
      setLoading(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  };

  return {
    file,
    loading,
    progress,
    stage,
    error,
    result,
    selectFile,
    removeFile,
    startAnalysis
  };
}