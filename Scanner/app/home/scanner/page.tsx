"use client";

import { useState, useContext, useEffect, useRef } from "react";
import { Scanner, useDevices } from "@yudiel/react-qr-scanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scan, Upload, Flashlight, FlashlightOff, Repeat } from "lucide-react";
import axios from "axios";
import { UserContext } from "@/app/context/UserContext";
import Ticket from "@/app/ui/Ticket";
import ShowMsg from "@/app/ui/ShowMsg";

export default function ScannerPage() {
  const [deviceId, setDeviceId] = useState<string>();
  const [pause, setPause] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [autoScan, setAutoScan] = useState(false); // 🔄 Auto Scan toggle
  const { userData, setUserData, setVisitors } = useContext<any>(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [visitorData, setVisitorData] = useState<any>(null);
  const [isMsg, setIsMsg] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const devices = useDevices();
  const uploadRef = useRef<HTMLInputElement>(null);
  const autoScanRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (devices.length > 0 && !deviceId) {
      setDeviceId(devices[0].deviceId);
    }
  }, [devices, deviceId]);

  const resetScanner = () => {
    setVisitorData(null);
    setPause(false);
    setIsScanning(false);
    setTorchOn(false);
  };

  const handleScan = async (data: string) => {
    if (!data) return;
    setPause(true);
    setIsScanning(false);
    const payload = { validatorId: userData._id, visitorId: data };
    try {
      const res = await axios.post("/api/auth/verification", payload);
      if (res.data?.verified) {
        setVisitorData(res.data.vdata);
        setVisitors((prev: any[]) => [...prev, res.data.vdata]);
        setIsOpen(true);
      } else {
        setMessage(res.data.message);
        setIsMsg(true);
      }
    } catch {
      setMessage("An error occurred");
      setIsMsg(true);
    }
  };

  // Auto Scan effect
  useEffect(() => {
    if (autoScan) {
      setIsScanning(true);
      setPause(false);
      autoScanRef.current = setInterval(() => {
        setIsScanning(true);
        setPause(false);
      }, 10000); // every 10 seconds
    } else {
      if (autoScanRef.current) clearInterval(autoScanRef.current);
    }
    return () => {
      if (autoScanRef.current) clearInterval(autoScanRef.current);
    };
  }, [autoScan]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/protected", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        });
        if (!response.ok) {
          window.location.href = "/login";
          return;
        }
        const data = await response.json();
        setUserData(data.user.user);
      } catch {
        window.location.href = "/login";
      }
    })();
  }, [setUserData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <Card className="w-full max-w-md bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-slate-800">
                QR Code Scanner
              </CardTitle>
              <p className="text-slate-600">
                Position the QR code within the frame
              </p>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative mb-6 w-full flex justify-center">
                <div className="rounded-2xl overflow-hidden shadow-lg w-full max-w-xs sm:max-w-sm">
                  <Scanner
                    formats={["qr_code"]}
                    constraints={{
                      // deviceId,
                      facingMode: { exact: "environment" },
                      advanced: torchOn
                        ? ([
                            { torch: true },
                          ] as unknown as MediaTrackConstraintSet[])
                        : [],
                    }}
                    onScan={(codes) =>
                      codes.length > 0 && handleScan(codes[0].rawValue)
                    }
                    onError={(e) => console.log("Scanner error", e)}
                    styles={{
                      container: {
                        height: "auto",
                        aspectRatio: "1 / 1",
                        width: "100%",
                        overflow: "hidden",
                      },
                    }}
                    allowMultiple
                    scanDelay={700}
                    paused={!isScanning || pause}
                  />    
                </div>

                {/* corner brackets */}
                <div className="absolute inset-0 pointer-events-none">
                  {["tl", "tr", "bl", "br"].map((pos) => {
                    const classes = {
                      tl: "top-4 left-4 border-t-4 border-l-4 rounded-tl-lg",
                      tr: "top-4 right-4 border-t-4 border-r-4 rounded-tr-lg",
                      bl: "bottom-4 left-4 border-b-4 border-l-4 rounded-bl-lg",
                      br: "bottom-4 right-4 border-b-4 border-r-4 rounded-br-lg",
                    }[pos];
                    return (
                      <div
                        key={pos}
                        className={`absolute ${classes} w-8 h-8 border-blue-500 animate-pulse`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="w-full space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  onClick={() => {
                    setIsScanning((s) => !s);
                    setPause(false);
                  }}
                >
                  <Scan className="w-4 h-4 mr-2 font-bold" />
                  {isScanning ? "Stop Scanning" : "Start Scanning"}
                </Button>

                {/* Auto Scan button */}
                <Button
                  variant={autoScan ? "default" : "outline"}
                  className="w-full border-slate-200 hover:bg-slate-50"
                  onClick={() => setAutoScan((a) => !a)}
                >
                  <Repeat className="w-4 h-4 mr-2 font-extrabold" />
                  {autoScan ? "Stop Auto Scan" : "Enable Auto Scan (10s)"}
                </Button>

                {/* Torch button */}
                <Button
                  variant="outline"
                  className="w-full border-slate-200 hover:bg-slate-50"
                  onClick={() => setTorchOn((t) => !t)}
                >
                  {torchOn ? (
                    <>
                      <FlashlightOff className="w-4 h-4 mr-2" /> Turn Torch Off
                    </>
                  ) : (
                    <>
                      <Flashlight className="w-4 h-4 mr-2" /> Turn Torch On
                    </>
                  )}
                </Button>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={uploadRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => handleScan(reader.result as string);
                    reader.readAsDataURL(file);
                  }}
                />
                <Button
                  variant="outline"
                  className="w-full border-slate-200 hover:bg-slate-50"
                  onClick={() => uploadRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload QR Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Ticket
        data={visitorData}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          resetScanner();
        }}
      />
      <ShowMsg
        isMsg={isMsg}
        message={message}
        onClose={() => {
          setIsMsg(false);
          resetScanner();
        }}
      />
    </div>
  );
}
