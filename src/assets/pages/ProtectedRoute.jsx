// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfileStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (!user) {
        // User is not logged in, redirect to auth page
        navigate('/auth');
        return;
      }

      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('is_profile_complete')
        .eq('id', user.id)
        .single();

      if (error || !profiles || !profiles.is_profile_complete) {
        // Profile is not complete, redirect to the form
        navigate('/complete-profile');
      } else {
        setLoading(false);
      }
    };

    checkProfileStatus();
  }, [navigate]);

  if (loading) {
    // You can show a loading spinner or a simple message here
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;