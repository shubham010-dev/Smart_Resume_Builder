import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { resumeAPI } from '../../services/api';
import { ArrowLeft, Download, Lightbulb, Loader2, FileText, GraduationCap, Briefcase, Mail, Phone, User, Edit3, Share2, Eye, Clock } from 'lucide-react';

export default function ResumePreview() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(true);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data } = await resumeAPI.getOne(id);
        setResume(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchResume();
  }, [id]);

  const handleGetSuggestions = async () => {
    setIsGeneratingSuggestions(true);
    try {
      const { data } = await resumeAPI.getSuggestions({
        resumeText: JSON.stringify(resume),
        userName: resume.name
      });
      setSuggestions(data.suggestion);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGeneratingSuggestions(false);
    }
  };

  const handleExportPDF = async (template) => {
    setIsExporting(true);
    try {
      window.open(`http://localhost:5000/api/pdf/${id}?template=${template}`, '_blank');
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setIsExporting(false), 2000);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Loader2 className="h-10 w-10 animate-spin text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Resume</h3>
          <p className="text-gray-600">Please wait while we fetch your resume...</p>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-12 h-12 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Resume Not Found</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">The resume you're looking for doesn't exist or has been deleted.</p>
          <Button 
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resumes
            </Link>
          </Button>
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
                <Eye className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Resume Preview
                </h1>
                <p className="text-gray-600 text-lg">Review and export your professional resume</p>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Last modified: {formatDate(resume.updatedAt)}</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6 lg:mt-0">
              <Button
                variant="outline"
                asChild
                className="border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-700 hover:text-blue-800 rounded-xl"
              >
                <Link to={`/edit-resume/${id}`} className="flex items-center">
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit Resume
                </Link>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleExportPDF('classic')}
                disabled={isExporting}
                className="border-gray-200 hover:bg-gray-50 rounded-xl"
              >
                <Download className="mr-2 h-4 w-4" />
                Classic PDF
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleExportPDF('modern')}
                disabled={isExporting}
                className="border-gray-200 hover:bg-gray-50 rounded-xl"
              >
                <Download className="mr-2 h-4 w-4" />
                Modern PDF
              </Button>
              
              <Button
                onClick={handleGetSuggestions}
                disabled={isGeneratingSuggestions}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isGeneratingSuggestions ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Lightbulb className="mr-2 h-4 w-4" />
                )}
                {isGeneratingSuggestions ? 'Generating...' : 'AI Suggestions'}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Resume Content */}
          <div className="xl:col-span-3">
            {/* AI Suggestions */}
            {suggestions && (
              <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
                  <CardTitle className="flex items-center text-xl">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3">
                      <Lightbulb className="h-4 w-4 text-white" />
                    </div>
                    AI-Powered Suggestions
                  </CardTitle>
                </div>
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                    <p className="text-gray-700 leading-relaxed text-lg">{suggestions}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Resume Content */}
            <Card className="overflow-hidden shadow-2xl border-0 rounded-3xl bg-white/80 backdrop-blur-sm">
              {/* Resume Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 px-10 py-16 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="relative">
                  <h1 className="text-5xl font-bold mb-4">{resume.name}</h1>
                  <div className="flex flex-wrap items-center gap-6 text-white/90 text-lg">
                    {resume.email && (
                      <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                        <Mail className="mr-2 h-5 w-5" />
                        <span>{resume.email}</span>
                      </div>
                    )}
                    {resume.phone && (
                      <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                        <Phone className="mr-2 h-5 w-5" />
                        <span>{resume.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <CardContent className="p-10 space-y-12">
                {/* Professional Summary */}
                {resume.summary && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-900">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      Professional Summary
                    </h2>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                      <p className="text-gray-700 leading-relaxed text-lg">{resume.summary}</p>
                    </div>
                  </div>
                )}

                {/* Education */}
                {resume.education && resume.education.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-8 flex items-center text-gray-900">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                        <GraduationCap className="h-5 w-5 text-white" />
                      </div>
                      Education
                    </h2>
                    <div className="space-y-6">
                      {resume.education.map((edu, index) => (
                        <div key={index} className="relative pl-8">
                          <div className="absolute left-0 top-0 w-4 h-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full"></div>
                          <div className="absolute left-2 top-4 w-0.5 h-full bg-gradient-to-b from-blue-600 to-purple-600 opacity-20"></div>
                          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                            <h3 className="text-xl font-bold mb-2 text-gray-900">{edu.school}</h3>
                            <p className="text-lg text-blue-700 font-semibold mb-1">{edu.degree}</p>
                            <p className="text-gray-600 font-medium">{edu.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {resume.experience && resume.experience.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-8 flex items-center text-gray-900">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                        <Briefcase className="h-5 w-5 text-white" />
                      </div>
                      Work Experience
                    </h2>
                    <div className="space-y-6">
                      {resume.experience.map((exp, index) => (
                        <div key={index} className="relative pl-8">
                          <div className="absolute left-0 top-0 w-4 h-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full"></div>
                          <div className="absolute left-2 top-4 w-0.5 h-full bg-gradient-to-b from-purple-600 to-blue-600 opacity-20"></div>
                          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                            <h3 className="text-xl font-bold mb-2 text-gray-900">{exp.company}</h3>
                            <p className="text-lg text-purple-700 font-semibold mb-2">{exp.role}</p>
                            <p className="text-gray-600 font-medium mb-4">{exp.duration}</p>
                            {exp.description && (
                              <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {resume.skills && resume.skills.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-8 flex items-center text-gray-900">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                        <Lightbulb className="h-5 w-5 text-white" />
                      </div>
                      Skills & Expertise
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {resume.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl px-4 py-3 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                          <span className="font-semibold text-blue-800">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-lg border-0 rounded-2xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full justify-start border-blue-200 hover:bg-blue-50 text-blue-700 rounded-xl"
                >
                  <Link to={`/edit-resume/${id}`}>
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit Resume
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-gray-200 hover:bg-gray-50 rounded-xl"
                  onClick={() => navigator.share && navigator.share({
                    title: `${resume.name}'s Resume`,
                    url: window.location.href
                  })}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Resume
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full justify-start border-gray-200 hover:bg-gray-50 rounded-xl"
                >
                  <Link to="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Resumes
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Resume Stats */}
            <Card className="shadow-lg border-0 rounded-2xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Resume Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center">
                    <GraduationCap className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-800">Education</span>
                  </div>
                  <span className="font-bold text-blue-700">{resume.education?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="font-medium text-purple-800">Experience</span>
                  </div>
                  <span className="font-bold text-purple-700">{resume.experience?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <div className="flex items-center">
                    <Lightbulb className="h-5 w-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-800">Skills</span>
                  </div>
                  <span className="font-bold text-green-700">{resume.skills?.length || 0}</span>
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card className="shadow-lg border-0 rounded-2xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => handleExportPDF('classic')}
                  disabled={isExporting}
                  className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Classic PDF
                </Button>
                <Button 
                  onClick={() => handleExportPDF('modern')}
                  disabled={isExporting}
                  variant="outline"
                  className="w-full justify-start border-gray-200 hover:bg-gray-50 rounded-xl"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Modern PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}