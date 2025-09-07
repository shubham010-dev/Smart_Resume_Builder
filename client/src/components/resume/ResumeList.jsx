import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { resumeAPI } from '../../services/api';
import { Plus, FileText, Trash2, Eye, GraduationCap, Briefcase, Loader2, Clock, Edit3 } from 'lucide-react';

export default function ResumeList() {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data } = await resumeAPI.getAll();
        setResumes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) {
      return;
    }
    
    setDeletingId(id);
    try {
      await resumeAPI.delete(id);
      setResumes(resumes.filter(resume => resume._id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Loader2 className="h-10 w-10 animate-spin text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Resumes</h3>
          <p className="text-gray-600">Please wait while we fetch your resumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Your Resumes
                </h1>
                <p className="text-gray-600 text-lg">Create, manage, and download your professional resumes</p>
                
                {/* Stats */}
                {resumes.length > 0 && (
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{resumes.length} resume{resumes.length !== 1 ? 's' : ''} created</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Create Button */}
            <div className="mt-6 lg:mt-0">
              <Button 
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link to="/create-resume" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Resume
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {resumes.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-3">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {resumes.map((resume) => (
                  <Card 
                    key={resume._id} 
                    className="group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:scale-105 rounded-3xl overflow-hidden"
                  >
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 px-6 py-8 text-white relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                      <div className="relative flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2 text-white truncate">{resume.name}</h3>
                          <p className="text-white/90 text-sm mb-1">{resume.email}</p>
                          {resume.phone && (
                            <p className="text-white/80 text-xs">{resume.phone}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(resume._id)}
                          disabled={deletingId === resume._id}
                          className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20 rounded-xl"
                        >
                          {deletingId === resume._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-6">
                      {/* Date */}
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>Last modified: {formatDate(resume.updatedAt)}</span>
                      </div>

                      {/* Resume Stats */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-100">
                          <div className="flex items-center justify-center mb-1">
                            <GraduationCap className="h-4 w-4 text-blue-600 mr-1" />
                            <span className="text-lg font-bold text-blue-700">{resume.education?.length || 0}</span>
                          </div>
                          <div className="text-xs font-medium text-blue-600">Education</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-100">
                          <div className="flex items-center justify-center mb-1">
                            <Briefcase className="h-4 w-4 text-purple-600 mr-1" />
                            <span className="text-lg font-bold text-purple-700">{resume.experience?.length || 0}</span>
                          </div>
                          <div className="text-xs font-medium text-purple-600">Experience</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-100">
                          <div className="flex items-center justify-center mb-1">
                            <FileText className="h-4 w-4 text-green-600 mr-1" />
                            <span className="text-lg font-bold text-green-700">{resume.skills?.length || 0}</span>
                          </div>
                          <div className="text-xs font-medium text-green-600">Skills</div>
                        </div>
                      </div>

                      {/* Skills Preview */}
                      {resume.skills && resume.skills.length > 0 && (
                        <div>
                          <div className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Top Skills</div>
                          <div className="flex flex-wrap gap-2">
                            {resume.skills.slice(0, 3).map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800 text-xs font-semibold rounded-xl border border-blue-200"
                              >
                                {skill}
                              </span>
                            ))}
                            {resume.skills.length > 3 && (
                              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-xl border border-gray-200">
                                +{resume.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          asChild 
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Link to={`/resume/${resume._id}`} className="flex items-center justify-center">
                            <Eye className="mr-2 h-4 w-4" />
                            View Resume
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          asChild
                          className="border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-700 hover:text-blue-800 rounded-xl"
                        >
                          <Link to={`/edit-resume/${resume._id}`}>
                            <Edit3 className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              {/* Quick Stats */}
              <Card className="shadow-lg border-0 rounded-2xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-800">Total Resumes</span>
                    </div>
                    <span className="font-bold text-blue-700">{resumes.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="font-medium text-purple-800">Total Jobs</span>
                    </div>
                    <span className="font-bold text-purple-700">
                      {resumes.reduce((acc, resume) => acc + (resume.experience?.length || 0), 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                    <div className="flex items-center">
                      <GraduationCap className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-medium text-green-800">Total Education</span>
                    </div>
                    <span className="font-bold text-green-700">
                      {resumes.reduce((acc, resume) => acc + (resume.education?.length || 0), 0)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg border-0 rounded-2xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl justify-start"
                  >
                    <Link to="/create-resume">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Resume
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Empty State */}
        {resumes.length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-white/80 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl border">
              <FileText className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">No resumes yet</h3>
            <p className="text-gray-600 mb-8 text-lg">Create your first professional resume to get started</p>
            <Button 
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/create-resume" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Resume
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}