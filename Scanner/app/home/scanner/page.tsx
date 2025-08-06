"use client";

import { useState, useContext, useEffect, useRef } from "react";
import { Scanner, useDevices } from "@yudiel/react-qr-scanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scan, Users, Upload } from "lucide-react";
import axios from "axios";
import { UserContext } from "@/app/context/UserContext";
import Ticket from "@/app/ui/Ticket";
import ShowMsg from "@/app/ui/ShowMsg";

interface Visitor {
  visitor_data: Record<string, string>;
  validation_status: boolean;
}

// helper to render status badge
const getStatusBadge = (status: boolean) =>
  status ? (
    <span className="inline-block px-2 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 rounded">
      ✓ Visited
    </span>
  ) : (
    <span className="inline-block px-2 py-1 text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200 rounded">
      ⏳ Pending
    </span>
  );

export default function ScannerPage() {
  const [deviceId, setDeviceId] = useState<string>();
  const [pause, setPause] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const { userData, setUserData, setVisitors } = useContext<any>(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [visitorData, setVisitorData] = useState<any>(null);
  const [isMsg, setIsMsg] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const devices = useDevices();
  const uploadRef = useRef<HTMLInputElement>(null);

  // auto‑select first camera
  useEffect(() => {
    if (devices.length > 0 && !deviceId) {
      setDeviceId(devices[0].deviceId);
    }
  }, [devices, deviceId]);

  const resetScanner = () => {
    setVisitorData(null);
    setPause(false);
    setIsScanning(false);
  };

  const handleScan = async (data: string) => {
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
    } catch (err) {
      console.error(err);
      setMessage("An error occurred");
      setIsMsg(true);
    }
  };

  useEffect(() => {
    // auth on mount
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
      } catch (error) {
        console.error("Auth check failed:", error);
        window.location.href = "/login";
      }
    })();
  }, [setUserData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
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
              <div className="relative mb-6">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <Scanner
                    formats={["qr_code"]}
                    constraints={{ deviceId }}
                    onScan={(codes) =>
                      codes.length > 0 && handleScan(codes[0].rawValue)
                    }
                    onError={(e) => console.log("Scanner error", e)}
                    styles={{
                      container: {
                        height: "350px",
                        width: "350px",
                        overflow: "hidden",
                      },
                    }}
                    components={{ audio: true, torch: true, zoom: true }}
                    allowMultiple
                    scanDelay={700}
                    paused={!isScanning || pause}
                  />
                </div>
                {/* Animated corner brackets */}
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
                  <Scan className="w-4 h-4 mr-2" />
                  {isScanning ? "Stop Scanning" : "Start Scanning"}
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

      {/* Modals */}
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
