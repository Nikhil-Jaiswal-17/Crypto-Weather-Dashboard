"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Save } from "lucide-react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Name",
    email: "Email@example.com",
    bio: "Software Developer | Coder",
  });

  // Load the profile data from localStorage when the component mounts
  useEffect(() => {
    const stored = localStorage.getItem("profile");
    if (stored) {
      try {
        const savedProfile = JSON.parse(stored);
        setProfile(savedProfile);
      } catch (err) {
        console.error("Error parsing saved profile:", err);
      }
    }
  }, []);

  // Update the profile on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedProfile = { ...profile, [e.target.name]: e.target.value };
    setProfile(updatedProfile);
    localStorage.setItem("profile", JSON.stringify(updatedProfile)); // Save to localStorage
  };

  // Toggle edit/save state
  const toggleEdit = () => {
    if (isEditing) {
      // Save final version when toggling off editing
      localStorage.setItem("profile", JSON.stringify(profile));
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="font-bold">Name</label>
              <Input
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="font-bold">Email</label>
              <Input
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* Bio Field */}
            <div>
              <label className="font-bold">Bio</label>
              <Textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* Edit/Save Button */}
            <Button onClick={toggleEdit} className="flex items-center">
              {isEditing ? <Save className="mr-2" size={16} /> : <Edit className="mr-2" size={16} />}
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
