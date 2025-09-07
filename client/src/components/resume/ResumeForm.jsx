import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { resumeAPI } from '../../services/api';
import { User, Mail, Phone, FileText, GraduationCap, Briefcase, Lightbulb, Plus, Trash2, Loader2, ArrowLeft, Save } from 'lucide-react';

export default function ResumeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    education: [{ school: '', degree: '', year: '' }],
    experience: [{ company: '', role: '', duration: '', description: '' }],
    skills: '',
  });

  // Load existing resume data for editing
  useEffect(() => {
    if (isEditMode) {
      const fetchResume = async () => {
        try {
          const { data } = await resumeAPI.getOne(id);
          setFormData({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            summary: data.summary || '',
            education: data.education && data.education.length > 0 ? data.education : [{ school: '', degree: '', year: '' }],
            experience: data.experience && data.experience.length > 0 ? data.experience : [{ company: '', role: '', duration: '', description: '' }],
            skills: data.skills ? data.skills.join(', ') : '',
          });
        } catch (error) {
          console.error('Error fetching resume:', error);
          navigate('/');
        } finally {
          setIsLoadingData(false);
        }
      };
      fetchResume();
    }
  }, [id, isEditMode, navigate]);

  const handleEducationChange = (index, field, value) => {
    const newEducation = formData.education.map((edu, i) => {
      if (i === index) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    setFormData({ ...formData, education: newEducation });
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = formData.experience.map((exp, i) => {
      if (i === index) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    setFormData({ ...formData, experience: newExperience });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { school: '', degree: '', year: '' }],
    });
  };

  const removeEducation = (index) => {
    if (formData.education.length > 1) {
      setFormData({
        ...formData,
        education: formData.education.filter((_, i) => i !== index),
      });
    }
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: '', role: '', duration: '', description: '' }],
    });
  };

  const removeExperience = (index) => {
    if (formData.experience.length > 1) {
      setFormData({
        ...formData,
        experience: formData.experience.filter((_, i) => i !== index),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formattedData = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
      };
      
      if (isEditMode) {
        await resumeAPI.update(id, formattedData);
        navigate(`/resume/${id}`);
      } else {
        const { data } = await resumeAPI.create(formattedData);
        navigate(`/resume/${data._id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Loader2 className="h-10 w-10 animate-spin text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Resume</h3>
          <p className="text-gray-600">Please wait while we fetch your resume data...</p>
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
                  {isEditMode ? 'Edit Your Resume' : 'Create Your Resume'}
                </h1>
                <p className="text-gray-600 text-lg">
                  {isEditMode ? 'Update your professional resume' : 'Build a professional resume that stands out to employers'}
                </p>
              </div>
            </div>
            
            {/* Back Button */}
            <div className="mt-6 lg:mt-0">
              <Button
                variant="outline"
                asChild
                className="border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-700 hover:text-blue-800 rounded-xl"
              >
                <Link to="/" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Resumes
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
              <CardTitle className="flex items-center text-xl">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3">
                  <User className="h-4 w-4 text-white" />
                </div>
                Personal Information
              </CardTitle>
            </div>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-semibold">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-semibold">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-semibold">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="summary" className="text-gray-700 font-semibold">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    placeholder="Write a brief summary of your professional background and key achievements..."
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    rows={4}
                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-xl">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3">
                    <GraduationCap className="h-4 w-4 text-white" />
                  </div>
                  Education
                </CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={addEducation}
                  className="text-white hover:bg-white/20 rounded-xl"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              </div>
            </div>
            <CardContent className="p-8">
              <div className="space-y-6">
                {formData.education.map((edu, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">Education #{index + 1}</h4>
                      {formData.education.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeEducation(index)}
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">School/University</Label>
                        <Input
                          placeholder="Enter school name"
                          value={edu.school}
                          onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                          className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Degree</Label>
                        <Input
                          placeholder="e.g., Bachelor of Science"
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                          className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Year</Label>
                        <Input
                          placeholder="e.g., 2020-2024"
                          value={edu.year}
                          onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                          className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-xl">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3">
                    <Briefcase className="h-4 w-4 text-white" />
                  </div>
                  Work Experience
                </CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={addExperience}
                  className="text-white hover:bg-white/20 rounded-xl"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Experience
                </Button>
              </div>
            </div>
            <CardContent className="p-8">
              <div className="space-y-6">
                {formData.experience.map((exp, index) => (
                  <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">Experience #{index + 1}</h4>
                      {formData.experience.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeExperience(index)}
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Company</Label>
                        <Input
                          placeholder="Enter company name"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                          className="border-purple-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Job Title</Label>
                        <Input
                          placeholder="Enter your job title"
                          value={exp.role}
                          onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                          className="border-purple-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl bg-white"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-gray-700 font-medium">Duration</Label>
                        <Input
                          placeholder="e.g., Jan 2020 - Present"
                          value={exp.duration}
                          onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                          className="border-purple-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl bg-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700 font-medium">Description</Label>
                      <Textarea
                        placeholder="Describe your key responsibilities and achievements..."
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                        rows={3}
                        className="border-purple-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
              <CardTitle className="flex items-center text-xl">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3">
                  <Lightbulb className="h-4 w-4 text-white" />
                </div>
                Skills & Expertise
              </CardTitle>
            </div>
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-gray-700 font-semibold">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    placeholder="e.g., JavaScript, React, Node.js, Python, Project Management"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                  />
                  <p className="text-sm text-gray-500">
                    Separate multiple skills with commas for better organization
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center pb-8">
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {isEditMode ? 'Updating Resume...' : 'Creating Resume...'}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  {isEditMode ? 'Update Resume' : 'Create Resume'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}