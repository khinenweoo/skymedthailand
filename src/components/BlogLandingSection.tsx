import React, { useState, useEffect } from "react";
import { BlogPost, Category } from "../types";
import { Calendar, User, ArrowRight, BookOpen, X, Clock } from "lucide-react";

export const BlogLandingSection: React.FC = () => {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedCat, setSelectedCat] = useState<string>("all");
	const [activePost, setActivePost] = useState<BlogPost | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchPostsAndCategories();
	}, []);

	const fetchPostsAndCategories = async () => {
		try {
			setLoading(true);
			const [postsRes, catRes] = await Promise.all([
				fetch("/api/posts"),
				fetch("/api/categories"),
			]);
			const postsData = await postsRes.json();
			const catData = await catRes.json();

			if (postsData.posts) setPosts(postsData.posts);
			if (catData.categories) setCategories(catData.categories);
		} catch (err) {
			console.error("Error fetching blog data:", err);
		} finally {
			setLoading(false);
		}
	};

	const filteredPosts =
		selectedCat === "all"
			? posts
			: posts.filter((p) => p.categoryId === selectedCat);

	return (
		<section
			id='blog'
			className='bg-white py-20 md:py-28 border-t border-slate-100'
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Section Title */}
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6'>
					<div>
						<h2 className='text-3xl sm:text-4xl font-sans font-bold text-[#2C344E] tracking-tight'>
							SkyMed Medical Articles
						</h2>
					</div>

					{/* Category Filter Pills */}
					<div className='flex flex-wrap gap-2'>
						<button
							onClick={() => setSelectedCat("all")}
							className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
								selectedCat === "all"
									? "bg-[#2563EB] text-white shadow-md"
									: "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
							}`}
						>
							All Topics
						</button>
						{categories.map((c) => (
							<button
								key={c.id}
								onClick={() => setSelectedCat(c.id)}
								className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
									selectedCat === c.id
										? "bg-[#2563EB] text-white shadow-md"
										: "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
								}`}
							>
								{c.name}
							</button>
						))}
					</div>
				</div>

				{/* Posts Grid */}
				{loading ? (
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{[1, 2, 3].map((n) => (
							<div
								key={n}
								className='bg-white rounded-[32px] p-6 h-80 animate-pulse border border-gray-100'
							/>
						))}
					</div>
				) : filteredPosts.length === 0 ? (
					<div className='bg-white rounded-[32px] p-12 text-center border border-gray-100 max-w-lg mx-auto shadow-sm'>
						<BookOpen className='w-12 h-12 text-[#2C344E]/40 mx-auto mb-4' />
						<h3 className='text-lg font-sans font-bold text-[#2C344E]'>
							No blog posts found in this category
						</h3>
						<p className='text-sm text-gray-500 mt-1'>
							Check back soon or explore other medical categories.
						</p>
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{filteredPosts.map((post) => (
							<article
								key={post.id}
								onClick={() => setActivePost(post)}
								className='bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer'
							>
								<div>
									<div className='relative aspect-[16/9] overflow-hidden bg-[#2C344E]'>
										<img
											src={post.imageUrl}
											alt={post.title}
											className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
											referrerPolicy='no-referrer'
										/>
										<span className='absolute top-4 left-4 bg-[#2563EB] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm'>
											{post.categoryName}
										</span>
									</div>

									<div className='p-6'>
										<div className='flex items-center gap-4 text-xs font-semibold text-gray-400 mb-3'>
											<span className='flex items-center gap-1.5'>
												<User className='w-3.5 h-3.5 text-[#2563EB]' />
												{post.authorName}
											</span>
											<span>•</span>
											<span className='flex items-center gap-1.5'>
												<Calendar className='w-3.5 h-3.5 text-[#2563EB]' />
												{new Date(post.createdAt).toLocaleDateString(
													undefined,
													{ month: "short", day: "numeric", year: "numeric" },
												)}
											</span>
										</div>

										<h3 className='text-lg font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors line-clamp-2 leading-snug mb-3'>
											{post.title}
										</h3>

										<p className='text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4'>
											{post.excerpt}
										</p>
									</div>
								</div>

								<div className='px-6 pb-6 pt-0 flex items-center gap-2 text-xs font-bold text-[#2563EB] group-hover:text-[#1D4ED8]'>
									<span>Read Full Article</span>
									<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
								</div>
							</article>
						))}
					</div>
				)}

				{/* Read Article Modal */}
				{activePost && (
					<div className='fixed inset-0 z-50 bg-[#2C344E]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto'>
						<div className='bg-white rounded-[32px] max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl my-8 border border-gray-100'>
							<button
								onClick={() => setActivePost(null)}
								className='absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors'
							>
								<X className='w-5 h-5' />
							</button>

							<span className='inline-block bg-slate-100 text-[#2C344E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-slate-200'>
								{activePost.categoryName}
							</span>

							<h2 className='text-2xl sm:text-3xl font-sans font-bold text-[#2C344E] mb-4 leading-snug'>
								{activePost.title}
							</h2>

							<div className='flex items-center gap-3 pb-6 mb-6 border-b border-gray-100 text-xs font-semibold text-gray-400'>
								<User className='w-4 h-4 text-[#2C344E]' />
								<span>
									{activePost.authorName} ({activePost.authorRole})
								</span>
								<span>•</span>
								<Clock className='w-4 h-4 text-[#2C344E]' />
								<span>
									{new Date(activePost.createdAt).toLocaleDateString()}
								</span>
							</div>

							{activePost.imageUrl && (
								<img
									src={activePost.imageUrl}
									alt={activePost.title}
									className='w-full h-64 object-cover rounded-[24px] mb-6 shadow-md'
									referrerPolicy='no-referrer'
								/>
							)}

							<div className='prose prose-slate max-w-none text-gray-600 leading-relaxed text-base space-y-4 whitespace-pre-line'>
								{activePost.content}
							</div>

							<div className='mt-8 pt-6 border-t border-gray-100 text-right'>
								<button
									onClick={() => setActivePost(null)}
									className='bg-[#0A1128] hover:bg-[#1A233D] text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-colors'
								>
									Close Article
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};
